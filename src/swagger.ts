import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
        .setTitle("Nest Server Boilerplate")
        .setVersion("0.0.1")
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("documentation", app, document);
}
