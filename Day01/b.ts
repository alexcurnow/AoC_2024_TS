import { promises as fs } from "fs";

export async function readFileAsync(filePath: string): Promise<string> {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function main() {
  let input: string;

  input = await readFileAsync("./input.txt");

  const parsedInput: string[] = input.split("\n").flatMap(pair => pair.split(" ").filter(s => s));
  const left: number[] = parsedInput.map(s => parseInt(s)).filter((_, idx) => idx % 2 === 0).sort();
  const right: number[] = parsedInput.map(s => parseInt(s)).filter((_, idx) => idx % 2 !== 0).sort();
  const result: number = left.map((value, idx) => Math.abs(value - right[idx])).reduce((prev, curr) => prev + curr);

  console.log(result);
}

main();
