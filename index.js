const traverse = (parentNode, graph) => {
  if (!graph[parentNode.id]) {
    return parentNode.value;
  }

  const children = graph[parentNode.id];
  let minimum = null;

  children.forEach((node) => {
    const val = traverse(node, graph);

    if (minimum === null) {
      minimum = val;
    } else {
      minimum = Math.min(minimum, val);
    }
  });

  return minimum + parentNode.value;
};

const toGraph = (collection, graph, level) => {
  if (collection.length === 1) {
    return graph;
  }

  const [first, ...rest] = collection;

  for (i = 0; i < first.length; i++) {
    const parent = `level:${level},pos:${i + 1}`;

    const [left, right] = rest.flat().slice(i, i + 2);
    const children = [
      { value: left, id: `level:${level + 1},pos:${i + 1}` },
      { value: right, id: `level:${level + 1},pos:${i + 2}` },
    ];

    graph[parent] = children;
  }

  return toGraph(rest, graph, level + 1);
};

const parseInput = (input) => {
  const [first, ...rest] = input.split("\n").map((val) => {
    return val.split(" ").map((str) => Number(str));
  });

  const [level] = first;

  return {
    level,
    pyramidAsArray: rest,
  };
};

const testCaseA = `4
1
2 3
4 8 6
7 8 8 10`;

const testCaseB = `4
3
7 4
2 4 6
8 5 9 3`;

const testCaseC = `15
75
95 64
17 47 82
18 35 87 10
20 4 82 47 65
19 1 23 75 3 34
88 2 77 73 7 63 67
99 65 4 28 6 16 70 92
41 41 26 56 83 40 80 70 33
41 48 72 33 47 32 37 16 94 29
53 71 44 65 25 43 91 52 97 51 14
70 11 33 28 77 73 17 78 39 68 17 57
91 71 52 38 17 14 91 43 58 50 27 29 48
63 66 4 68 89 53 67 30 73 16 69 87 40 31
4 62 98 27 23 9 70 98 73 93 38 53 60 4 23`;

const createGraph = (input) => {
  const { pyramidAsArray } = parseInput(input);
  const graph = toGraph(pyramidAsArray, {}, 1);

  return {
    root: { value: pyramidAsArray[0][0], id: "level:1,pos:1" },
    graph,
  };
};

const { root, graph } = createGraph(testCaseC);

const minPath = traverse(root, graph);

console.log({ minPath });
