import {statSync,existsSync,writeFileSync} from "fs";
import {compileFromFile} from "json-schema-to-typescript";

export class jsons2ts {
  async tsFromJsonSFiles(files: string[]) {
      for (const file of files) {
          const outputFile = file.replace(".json", ".ts");

          // Check if the schema file is newer than the generated TypeScript code
          const schemaModificationTime = statSync(file).mtime;
          let generatedCodeModificationTime: Date | undefined;
          if (outputFile !== undefined && existsSync(outputFile)) {
              generatedCodeModificationTime = statSync(outputFile).mtime;
          }

          if (generatedCodeModificationTime === undefined || schemaModificationTime > generatedCodeModificationTime) {
              // Generate the TypeScript code
              const tsCode = await compileFromFile(file);

              // Write the generated code to the output file
              writeFileSync(outputFile, tsCode);
          }
      }
  }
}