import * as part1 from "./vocabulary-part1";
import * as part2 from "./vocabulary";

export type BookType = "part1" | "part2";

export function getVocabularyModule(book: BookType) {
  return book === "part1" ? part1 : part2;
}

export function getBookTitle(book: BookType): string {
  return book === "part1" ? "Part 1" : "Part 2";
}
