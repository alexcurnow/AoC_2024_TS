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

  const input: string = await readFileAsync("./input.txt");

  // be lazy and don't change anything with parsing and sorting shit...
  const parsedInput: string[] = input.split("\n").flatMap(pair => pair.split(" ").filter(s => s));
  const left: number[] = parsedInput.map(s => parseInt(s)).filter((_, idx) => idx % 2 === 0).sort();
  const right: number[] = parsedInput.map(s => parseInt(s)).filter((_, idx) => idx % 2 !== 0).sort();

  // init a new dictionary aka Map<T, T>
  const dict = new Map<number, number>();

  // for each number in the right collection...
  right.forEach(num => {
    //... if it's in the left collection...
    if (left.includes(num)) {
      //... get its value from the dictionary or return 0...
      const value = dict.get(num) ?? 0;
      // ... set (if it's initial) or update the key value pair by incrementing the value at that key.
      dict.set(num, value + 1);
    }
  });

  // init an empty numbers array
  let results: number[] = [];

  // for each key value pair in the dictionary...
  dict.forEach((value, key) => {
    //... push the result of multiplying the value and key together
    results.push(value * key);
  });

  //... use the reduce method to sum all those values together
  const finalResult = results.reduce((prev, curr) => prev + curr);

  console.log(finalResult);
}

main();
