import * as csv from "csv/sync"
import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import { fileURLToPath } from 'url'
import path from 'node:path'

// https://csv.js.org/parse/api/sync/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(function() {
    const inputFilesPath = path.join(__dirname, "input");
    const parseRow = rawData => {
        return {
            name: rawData[0],
            acronym: rawData[1],
            address: {
                street: rawData[2],
                number: rawData[3],
                complement: rawData[4],
                city: rawData[5],
                state: rawData[6],
                postalCode: rawData[7]
            },
            phone: rawData[8],
            email: rawData[9],
            obs: rawData[10]
        }
    }
    const result = {syndicates: []};
    readdirSync(inputFilesPath).forEach(file => {
        const csvContent = readFileSync(path.join(inputFilesPath, file)).toString();
        /** @type {string[]} */
        const csvData = csv.parse(csvContent);
        const parsed = csvData.map(parseRow);
        const firstItemWithObsIndex = Math.max(2, parsed.findIndex((item, i) => (i >=2 && item.obs != "")));
        const _tmp = {
            ...parsed[1],
            affiliates: parsed.slice(2, firstItemWithObsIndex-1),
            partners: parsed.slice(firstItemWithObsIndex)
        }
        // console.log(_tmp);
        result.syndicates.push(_tmp)
    });
    writeFileSync("output.json", JSON.stringify(result, null, 4), {encoding: "utf8"});
})();