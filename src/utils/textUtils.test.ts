import { describe, it, expect } from "vitest";
import { stripHtmlTags, shortenText, cleanAndShorten } from "./textUtils";

describe("stripHtmlTags", () => {
  it("should remove simple HTML tags", () => {
    const input = "<p>Hello World</p>";
    expect(stripHtmlTags(input)).toBe("Hello World");
  });

  it("should remove nested HTML tags", () => {
    const input = "<div><p>Hello <strong>World</strong></p></div>";
    expect(stripHtmlTags(input)).toBe("Hello World");
  });

  it("should remove self-closing tags", () => {
    const input = "Hello<br/>World";
    expect(stripHtmlTags(input)).toBe("HelloWorld");
  });

  it("should handle tags with attributes", () => {
    const input = '<p class="text">Hello</p>';
    expect(stripHtmlTags(input)).toBe("Hello");
  });

  it("should handle multiple tags with attributes", () => {
    const input = '<a href="test.com" target="_blank">Link</a>';
    expect(stripHtmlTags(input)).toBe("Link");
  });

  it("should handle empty string", () => {
    expect(stripHtmlTags("")).toBe("");
  });

  it("should handle text without HTML tags", () => {
    const input = "Plain text without tags";
    expect(stripHtmlTags(input)).toBe("Plain text without tags");
  });

  it("should handle malformed HTML gracefully", () => {
    const input = "<p>Unclosed tag";
    expect(stripHtmlTags(input)).toBe("Unclosed tag");
  });

  it("should remove script and style tags with content", () => {
    const input = "<script>alert('test')</script>Hello<style>.test{}</style>";
    expect(stripHtmlTags(input)).toBe("alert('test')Hello.test{}");
  });
});

describe("shortenText", () => {
  it("should shorten text longer than maxLength with ellipsis", () => {
    const input = "This is a very long text";
    expect(shortenText(input, 10)).toBe("This is a ...");
  });

  it("should shorten text longer than maxLength without ellipsis", () => {
    const input = "This is a very long text";
    expect(shortenText(input, 10, false)).toBe("This is a ");
  });

  it("should not shorten text shorter than maxLength", () => {
    const input = "Short";
    expect(shortenText(input, 10)).toBe("Short");
  });

  it("should handle maxLength of 0", () => {
    const input = "Hello";
    expect(shortenText(input, 0)).toBe("...");
  });

  it("should default to adding ellipsis", () => {
    const input = "Long text here";
    const result = shortenText(input, 5);
    expect(result).toBe("Long ...");
  });
});

describe("cleanAndShorten", () => {
  it("should strip HTML and shorten text", () => {
    const input = "<p>This is a very long paragraph with HTML tags</p>";
    const result = cleanAndShorten(input, 20);
    expect(result).toBe("This is a very long ");
  });

  it("should handle complex HTML", () => {
    const input =
      "<div><p>Episode summary with <strong>bold</strong> and <em>italic</em> text</p></div>";
    const result = cleanAndShorten(input, 30);
    expect(result).toBe("Episode summary with bold and ");
  });

  it("should handle real-world TV show summary", () => {
    const input =
      "<p>The show revolves around three girls: Blossom, Bubbles, and Buttercup. They were created by Professor Utonium in an attempt to create the 'perfect little girl'.</p>";
    const result = cleanAndShorten(input, 100);
    expect(result).toBe(
      "The show revolves around three girls: Blossom, Bubbles, and Buttercup. They were created by Professo"
    );
    expect(result.length).toBe(100);
  });
});
