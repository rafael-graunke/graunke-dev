---
title: "chip-8-rs"
summary: "A CHIP-8 interpreter written in Rust, built to learn low-level programming, Rust and console emulation."
status: done
featured: true
order: 3
stack: [Rust, SDL2]
links:
  repo: https://github.com/rafael-graunke/chip-8-rs
---

## Problem

I started this project to learn three things I was new to: low-level programming, Rust, and hardware/console emulation. CHIP-8 is a small, well-documented virtual machine, which makes it a common first emulator.

## How it works

The interpreter loads a ROM and runs it in a cycle-accurate loop, rendering to the screen with SDL2. The number of instructions per frame is configurable from the command line.

Done:

- Memory, stack, registers and program counter
- ROM loading
- Fonts
- Cycle-accurate loop
- Opcode matching, with all opcodes implemented
- Display output

## What's next / what I'd do differently

**Planned:** configurable quirks (behavior differences between CHIP-8 implementations).
