import * as d3 from "d3";

export interface D3Node extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  graphId: string;
  attributes: any;
}

export interface D3Edge extends d3.SimulationLinkDatum<D3Node> {
  id: string;
  label: string;
  source: D3Node;
  target: D3Node;
  attributes: any;
}

export function dragstarted(target: SVGElement, event: d3.D3DragEvent<SVGElement, undefined, any>) {
  d3.select(target).raise().attr("cursor", "grabbing");
}

export function dragged(target: SVGElement, event: d3.D3DragEvent<SVGElement, undefined, any>, d: any) {
  d3.select(target)
    .attr("x", (d.x = event.x))
    .attr("y", (d.y = event.y));
}

export function dragended(target: SVGElement, event: d3.D3DragEvent<SVGElement, undefined, any>) {
  d3.select(target).attr("cursor", "grab");
}