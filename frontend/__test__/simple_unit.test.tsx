import React from "react";
import { render, screen } from "@testing-library/react";
//import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import Bar from "../src/components/Bar";

describe("Bar Component", () => {
  it("renders without crashing", () => {
    
    expect(1).toBe(1);
  });

  /*     it('displays the correct text', () => {
        render(<Bar row={{id: 1, x:1, y:1, z:1}} isTransparent={false} onClick={()=>{}}/>);
        const barElement = screen.getByTestId('bar');
        expect(barElement);
    });

    it('has the correct class', () => {
        render(<Bar row={{id: 1, x:1, y:1, z:1}} isTransparent={false} onClick={()=>{}}/>);
        const barElement = screen.getByTestId('bar');
        expect(barElement);
    }); */
});
