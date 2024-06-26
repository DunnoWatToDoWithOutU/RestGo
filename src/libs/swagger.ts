import { createSwaggerSpec } from 'next-swagger-doc'

export const getApiDocs = async () => {
    const spec = createSwaggerSpec({
        apiFolder: 'src/app/api/v2',
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Next Swagger API',
                version: '1.0',
            },
            servers: [
                {
                    url: "https://rest-go.vercel.app/api/v2",
                    description: "My API Document",
                }
            ],
            components: {
                securitySchemes: {
                    BearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT'
                    }
                }
            },
            security: []
        }
    });
    return spec;
}