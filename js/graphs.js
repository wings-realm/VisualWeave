var seq = [];
function _AddEdge() {
    var inp1 = document.querySelector("#node1").value;
    var inp2 = document.querySelector("#node2").value;
    console.log(inp1, inp2);
    if (inp1 === "" || inp2 === "") {
        alert("Please enter both values!!");
        return;
    }
    seq.push([parseInt(inp1), parseInt(inp2)]);
    render();
}

function _AddNode() {
    var inp0 = document.querySelector("#node0").value;
    if (inp0 === "") {
        alert("Please enter a value!!");
        return;
    }
    seq.push(parseInt(inp0));
    render();
}

function render() {
    var g = new Dracula.Graph();
    for (var i = 0; i < seq.length; i++) {
        if (seq[i].length == 2) {
            g.addEdge(seq[i][0], seq[i][1]);
        } else {
            g.addNode(seq[i]);
        }
    }
    var canvas = document.querySelector('#canvas2');
    if (canvas.firstElementChild) canvas.removeChild(canvas.firstElementChild);
    var layouter = new Dracula.Layout.Spring(g);
    layouter.layout();
    var renderer = new Dracula.Renderer.Raphael(document.getElementById('canvas2'), g, 700, 600);
    renderer.draw();
    canvas.style.backgroundColor = "white";
}

function generateRandomGraph() {
    var sz = document.getElementById("gsz").value;
    var arr = [];
    for (var i = 1; i <= sz; i++) {
        arr.push(i);
    }
    var allEdges = [];
    for (var i = 1; i <= sz; i++) {
        for (var j = i + 1; j <= sz; j++) {
            allEdges.push([i, j]);
        }
    }
    var m = Math.floor(Math.random() * (Math.floor(sz * (sz - 1) / 2) + 1)), c = Math.floor(sz * (sz - 1) / 2);
    var g = new Dracula.Graph();
    for (var i = 0; i < sz; i++) {
        g.addNode(i + 1);
    }
    for (var i = 0; i < m; i++) {
        var ind = Math.floor(Math.random() * c);
        g.addEdge(allEdges[ind][0], allEdges[ind][1]);
        allEdges.splice(ind, 1);
        c--;
    }
    var canvas = document.querySelector('#canvas1');
    if (canvas.firstElementChild) canvas.removeChild(canvas.firstElementChild);
    var layouter = new Dracula.Layout.Spring(g);
    layouter.layout();
    var renderer = new Dracula.Renderer.Raphael(document.getElementById('canvas1'), g, 700, 600);
    renderer.draw();
    canvas.style.backgroundColor = "white";
}
