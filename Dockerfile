# Layer 1
# Pull Microsoft asp.net and name it base
FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
# navigate to /app and use that as the working directory of the container
WORKDIR /app
# expose it on port 80
EXPOSE 80/tcp

# Layer 2
# Pull the Microsoft asp.net software development Kit and name it build
FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
#navigate to /src folder and use that as the working directory of the Build Version
WORKDIR /src
# Copy the API Proj to ht esrc folder
COPY ["API.csproj", "./"]
# Run dot net restore on the API.csproj
RUN dotnet restore "API.csproj"
# Copy the rest of the files to the src folder
COPY . .
# Navigate to /src/. folder and use that as the working directory
WORKDIR "/src/."
# Run dotnet build on the API.csproj setting the configuration as the release version and the output directory to /app/build
RUN dotnet build "API.csproj" -c Release -o /app/build

# Layer 3 Publish layer
#Pull the build version from layer 2 and name it publish
FROM build AS publish
# Run a dotnet Publish on the API.csproj setting configuration as the release versionan the output directory to /app/publish
RUN dotnet publish "API.csproj" -c Release -o /app/publish

# Layer 4
# Pull the base version and name it final
FROM base AS final
# Navigate to /app and use that as the working directory of the container
WORKDIR /app
# Copy from the publish folder to the /app/publish .
COPY --from=publish /app/publish .
# Set the Entrypoint to the .net Core WebApi
ENTRYPOINT ["dotnet", "API.dll"]

# base image
FROM node:latest
RUN mkdir /usr/src/app
# set working directory
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9

# add app
COPY . /usr/src/app

# start app
CMD ng serve --host 0.0.0.0 --port 4200