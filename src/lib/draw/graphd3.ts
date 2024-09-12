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

