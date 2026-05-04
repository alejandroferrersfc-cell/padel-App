# Build stage
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

# Copy Maven wrapper and POM first to leverage caching
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# Fix line endings for mvnw in case they are CRLF (Windows)
RUN sed -i 's/\r$//' mvnw
RUN chmod +x mvnw

# Download dependencies offline (helps with caching)
RUN ./mvnw dependency:go-offline

# Copy the actual source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the compiled JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
