function generate(observer) {
  var mirror;
  for (var i = 0, ilen = beforeDict.length; i < ilen; i++) {
    if (beforeDict[i].obj === observer.object) {
      mirror = beforeDict[i];
      break;
    }
  }
  _generate(mirror.value, observer.object, observer.patches, "");
  if (observer.patches.length) {
    apply(mirror.value, observer.patches);
  }
  var temp = observer.patches;
  if (temp.length > 0) {
    observer.patches = [];
    if (observer.callback) {
      observer.callback(temp);
    }
  }
  return temp;
}

function observe(obj, callback) {
  var patches = [];
  var root = obj;
  var observer;
  var mirror = getMirror(obj);
  if (!mirror) {
    mirror = new Mirror(obj);
    beforeDict.push(mirror);
  } else {
    observer = getObserverFromMirror(mirror, callback);
  }
  if (observer) {
    return observer;
  }
  observer = {};
  mirror.value = deepClone(obj);
  if (callback) {
    observer.callback = callback;
    observer.next = null;
    var dirtyCheck = function () {
      generate(observer);
    };
    var fastCheck = function () {
      clearTimeout(observer.next);
      observer.next = setTimeout(dirtyCheck, 0);
    };
    if (typeof window !== "undefined") {
      if (window.addEventListener) {
        window.addEventListener("mouseup", fastCheck);
        window.addEventListener("keyup", fastCheck);
        window.addEventListener("mousedown", fastCheck);
        window.addEventListener("keydown", fastCheck);
        window.addEventListener("change", fastCheck);
      } else {
        document.documentElement.attachEvent("onmouseup", fastCheck);
        document.documentElement.attachEvent("onkeyup", fastCheck);
        document.documentElement.attachEvent("onmousedown", fastCheck);
        document.documentElement.attachEvent("onkeydown", fastCheck);
        document.documentElement.attachEvent("onchange", fastCheck);
      }
    }
  }
  observer.patches = patches;
  observer.object = obj;
  return observer;
}
