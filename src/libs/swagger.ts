import { createSwaggerSpec } from 'next-swagger-doc'

export const getApiDocs = async () => {
    const spec = createSwaggerSpec({
        apiFolder: 'src/app/api',
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Next Swagger API',
                version: '1.0'
            },
            servers: [
                {
                    url: "https://rest-go.vercel.app",
                    description: "My API Document",
                }
            ]
        }
    });
    return spec;
}