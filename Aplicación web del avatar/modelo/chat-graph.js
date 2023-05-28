// CHAT GRAPH
class Edge { 
	//Constructor, Time O(1) Space O(1)
	constructor(v, w) {
        //The vertex is the video code and the weight the answer (si/no/neutro) that invokes it
		this.weight = w;
    this.connectedVetex = v; 
	}
 
  //Time O(1) Space O(1)
	toString(){
		return "(" + this.connectedVetex + "," + this.weight + ")";
	}
}

// create a graph class
class Graph {
    // defining adjacent list for the edges
    constructor()
    {
        this.AdjList = new Map();
    }
  
  //Add nodes including adding code name and text
  addNode(name, data) {
    this.AdjList.set(name, { text: data, edges: new Set() });
  }

  //Add edges including adding nodes, Time O(1) Space O(1)
	addEdge(a, b, w) {
        if (this.AdjList.get(a) == null)
            this.addNode(a, text);
            //this.AdjList.set(a, [""]); //add node
        let edge1 = new Edge(b, w)     		
        this.AdjList.get(a).edges.add(edge1); //add edge
    }

  // Prints the vertex and adjacency list
  printGraph() {
    // get all the vertices
    let get_keys = this.AdjList.keys();
    
    // iterate over the vertices
      for (let i of get_keys){
        // get the corresponding adjacency list for the vertex
        let get_values = this.AdjList.get(i);
        let conc = "";
    
        // iterate over the adjacency list concatenate the values into a string
        for (let j of get_values.edges)
            conc += j + " - ";
    
            // print the vertex and its adjacency list
        console.log(i + " text: " + get_values.text + " -> " + conc);
      }
  }

  //Find the vetex with the answer to a, Time O(n) Space O(1), n is number of neighbors 
  findNextVetexByEdge(a, ans) {
		  let ne = this.getAllVetex(a);
      let ret = null;
      if(ne.size >0){
        for (const edgeName of ne) {		
          if (edgeName.weight == ans) {
            ret = edgeName.connectedVetex; 
          }
        }
      }
      return ret;
	}

  //returns all the edges connected to a
  getAllVetex(a) {
		  return this.AdjList.get(a).edges;
	}

  //returns the text of the 
  getText(a) {
    return this.AdjList.get(a).text;
  }

  graphToJSON() {
      let nodes = {};
      let get_keys = this.AdjList.keys();
      for (const node of get_keys) {
        const edges = [];
        const get_edges = this.getAllVetex(node)
        for (const edge of get_edges) {
          edges.push({ to: edge.connectedVetex, weight: edge.weight });
        }
        nodes[node] = { text: this.getText(node), edges: edges };
      }
      return { nodes: nodes };
  }
      

}

// Lee el archivo JSON
async function logJSONData() {
  const response = await fetch('http://192.168.8.68/pepper/modelo/Dialogue.json');
  const jsonData = await response.json();
  
  let g = new Graph();

    // Add the nodes to the graph 
    for (const nodeName in jsonData.nodes) {
      const node = jsonData.nodes[nodeName];
      g.addNode(nodeName, node.text);
    }
  
    // Add the vetex to the graph
    for (const nodeName in jsonData.nodes) {
      const node = jsonData.nodes[nodeName];
      for (const edge of node.edges) {
        g.addEdge(nodeName, edge.to, edge.weight);
      }
    }
    return g;
}

