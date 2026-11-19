---
title: "LLM Etude"
summary: "Notebooks tracking my study of LLM application concepts through minimal, naive-first implementations."
status: done
featured: true
order: 2
stack: [Python, Jupyter, LiteLLM, Ollama]
links:
  repo: https://github.com/rafael-graunke/llm-etude
---

## Problem

I wanted to understand application-level integration with LLMs (prompting, evaluation, tool use) without hiding the concepts behind frameworks. The goal isn't ML internals. It's seeing each concept work with the least code possible.

## How it works

Each concept is a Jupyter notebook. I write the code, docstrings and comments by hand, not with LLM prompts.

Done so far:

1. **LLM prompting:** how to interact with LLM APIs.
2. **Prompt evaluation:** evaluating a prompt and improving it iteratively.
3. **Prompt engineering:** techniques for writing better prompts.
4. **Tool use:** how models call tools.
5. **RAG:** retrieval-augmented generation, from chunking and embeddings to a working end-to-end chess rules assistant.

The RAG study has two notebooks. The first works through the concepts: chunking strategies (size, structure, semantic, sentence), embeddings, cosine similarity derived by hand and then simplified with NumPy, and how HNSW indexing avoids a linear scan. It then builds a retrieval-only setup over the FIDE Laws of Chess. Chunks are split by article and subsection, retrieval is a linear cosine search with `nomic-embed-text`, and a small dataset measures Recall@K and precision to compare chunking choices. The second notebook is the final product: a small agent that retrieves the top matching rules and answers only from that context. If the rules don't cover the question, it says so.

## Decisions & trade-offs

**Minimal dependencies, no frameworks**
- *Context:* frameworks hide the concepts I'm trying to learn.
- *Decision:* depend only on `ipykernel` and `litellm`, plus `numpy` and `pypdf` for RAG, and implement the rest directly.
- *Consequence:* the model is a single constant, so anyone can swap it and run the notebooks.

**Linear search instead of a vector database**
- *Context:* the Laws of Chess produce only about a hundred chunks, and I wanted to understand retrieval itself.
- *Decision:* compute cosine similarity with NumPy matrix multiplication over all chunk embeddings, and study HNSW only as theory.
- *Consequence:* retrieval is simple and exact at this scale, and I can measure it with Recall@K. It would not scale to millions of vectors.

**Local model**
- *Context:* iterating against a paid API costs money.
- *Decision:* run `qwen3:14b` locally through Ollama on an RTX 5060 Ti (16 GB VRAM).
- *Consequence:* iterating is free. LiteLLM makes it easy to switch models between machines.
