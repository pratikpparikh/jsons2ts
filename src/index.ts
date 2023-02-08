import { jsons2ts } from "./jsons2ts";

const jsonSchemaFiles = process.argv.slice(2) || undefined;

if (jsonSchemaFiles === undefined || jsonSchemaFiles.length === 0) {
    console.log('No schemas passed in. Exiting program.');
} else {
    let generator = new jsons2ts();
    
    generator.tsFromJsonSFiles(jsonSchemaFiles).then(() => {
        console.log("TypeScript code generated successfully from JSON schemas");
    });

}
