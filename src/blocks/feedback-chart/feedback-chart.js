const feedbackChartElem = $(".feedback-chart");
const feedbackChartDiagrammElem = $(".feedback-chart__diagramm");

//Великолепно
const sumptuously = feedbackChartElem.attr("sumptuously");
//Хорошо
const good = feedbackChartElem.attr("good");
//Удовлетворительно
const satisfactorily = feedbackChartElem.attr("satisfactorily");
//Разочарован
const disappointed = feedbackChartElem.attr("disappointed");

const svgNamespaceUri = "http://www.w3.org/2000/svg";

//Великолепно
//Хорошо
//Удовлетворительно
//Разочарован
const gradientColors = [
  ["#FFE39C", "#FFBA9C"],
  ["#6FCF97", "#66D2EA"],
  ["#BC9CFF", "#8BA4F9"],
  ["#919191", "#3D497"]
];

const data = [
  { type: "sumptuously", value: sumptuously },
  { type: "good", value: good },
  { type: "satisfactorily", value: satisfactorily },
  { type: "disappointed", value: disappointed }
];

const validData = setDataTo100percent(data);

addGradients();
paintDiagramm(validData);
paintSumVoices(data);
paintDiagrammKey();

function setDataTo100percent(data) {
  let sum = 0;

  data.map(item => {
    sum += item.value * 1;
  });

  data = data.map(item => {
    return {
      type: item.type,
      value: (item.value * 100) / sum
    };
  });

  return data;
}

function addGradients() {
  let defs = document.createElementNS(svgNamespaceUri, "defs");

  for (let i = 0; i < gradientColors.length; i++) {
    let gradient = document.createElementNS(svgNamespaceUri, "linearGradient");
    gradient.id = `gradient${i + 1}`;
    gradient.setAttributeNS(null, "x1", "0%");
    gradient.setAttributeNS(null, "y1", "0%");
    gradient.setAttributeNS(null, "x2", "0%");
    gradient.setAttributeNS(null, "y2", "100%");

    let stopStart = document.createElementNS(svgNamespaceUri, "stop");
    stopStart.setAttributeNS(null, "offset", "0%");
    stopStart.setAttributeNS(null, "stop-color", gradientColors[i][0]);

    let stopEnd = document.createElementNS(svgNamespaceUri, "stop");
    stopEnd.setAttributeNS(null, "offset", "100%");
    stopEnd.setAttributeNS(null, "stop-color", gradientColors[i][1]);

    gradient.append(stopStart, stopEnd);

    defs.append(gradient);
  }

  feedbackChartDiagrammElem.append(defs);
}

function paintDiagramm(data) {
  //General params
  let cx = 17;
  let cy = 17;
  let r = 15.91549430918954;
  let fill = "transparent";
  let strokeWidth = "1";
  let offset = 0;
  //===
  for (let i = 0; i < data.length; i++) {
    if (data[i].value != 0) {
      let sector = document.createElementNS(svgNamespaceUri, "circle");

      sector.setAttributeNS(null, "cx", cx);
      sector.setAttributeNS(null, "cy", cy);
      sector.setAttributeNS(null, "r", r);
      sector.classList.add("feedback-chart__diagramm__sector");
      sector.style.fill = fill;
      sector.style.strokeWidth = strokeWidth;

      let dash1 = data[i].value;
      let dash2 = 100 - dash1;

      sector.style.stroke = `url(#gradient${i + 1})`;
      sector.style.strokeDasharray = `${dash1} ${dash2}`;
      sector.style.strokeDashoffset = dash1 + offset + 25-1.25;

      offset += dash1;

      feedbackChartDiagrammElem.append(sector);

      //=====AddWhiteGap

      let sectorWhite = document.createElementNS(svgNamespaceUri, "circle");

      sectorWhite.setAttributeNS(null, "cx", cx);
      sectorWhite.setAttributeNS(null, "cy", cy);
      sectorWhite.setAttributeNS(null, "r", r);
      sectorWhite.classList.add("feedback-chart__diagramm__white-sector");
      sectorWhite.style.fill = fill;
      sectorWhite.style.strokeWidth = strokeWidth;

      dash1 = 1;
      dash2 = 100 - dash1;

      sectorWhite.style.stroke = `#fff`;
      sectorWhite.style.strokeDasharray = `${dash1} ${dash2}`;
      sectorWhite.style.strokeDashoffset = dash1 + offset + 25-1.25;

      offset += dash1;

      feedbackChartDiagrammElem.append(sectorWhite);
    }
  }
}

function paintSumVoices(data) {
  let sum = 0;

  data.map(item => {
    sum += item.value * 1;
  });

  let group = document.createElementNS(svgNamespaceUri, "g");

  let textNumber = document.createElementNS(svgNamespaceUri, "text");

  let textLabel = document.createElementNS(svgNamespaceUri, "text");

  group.classList.add("feedback-chart__diagramm__chart-text");

  textNumber.classList.add("feedback-chart__diagramm__chart-number");
  textNumber.textContent = sum;
  textNumber.setAttribute("x", "50%");
  textNumber.setAttribute("y", "50%");

  textLabel.classList.add("feedback-chart__diagramm__chart-label");
  textLabel.textContent = "Голосов";
  textLabel.setAttribute("x", "50%");
  textLabel.setAttribute("y", "50%");

  group.append(textNumber, textLabel);

  feedbackChartDiagrammElem.append(group);
}

function paintDiagrammKey() {
  let chartKeyList = document.createElement("ul");
  chartKeyList.classList.add("feedback-chart__key");

  let sumptuouslyListItem = document.createElement("li");
  sumptuouslyListItem.textContent = "Великолепно";

  let goodListItem = document.createElement("li");
  goodListItem.textContent = "Хорошо";

  let satisfactorilyListItem = document.createElement("li");
  satisfactorilyListItem.textContent = "Удовлетворительно";

  let disappointedListItem = document.createElement("li");
  disappointedListItem.textContent = "Разочарован";

  chartKeyList.append(
    sumptuouslyListItem,
    goodListItem,
    satisfactorilyListItem,
    disappointedListItem
  );

  feedbackChartElem.append(chartKeyList);
}
