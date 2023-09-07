export function downloadCSV(data: string[][], filename: string) {
  return new Promise((resolve) => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      data.map((row) => row.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    resolve(null);
  });
}

type result = {
  annotation: {
    dimensions: Record<string, { title: string }>;
    measures: Record<string, { title: string }>;
    segments: Record<string, { title: string }>;
    timeDimensions: Record<string, { title: string }>;
  };
  data: Record<string, string | number>[];
};

export function translateCsvData(data: result[]) {
  return data.reduce((pre, cur) => {
    const { annotation, data } = cur;

    const titlesMap = {};
    Object.keys(annotation).forEach((k) => {
      Object.keys(annotation[k]).forEach((_k) => {
        titlesMap[_k] = annotation[k][_k]['title'];
      });
    });

    let titles: string[] = [];

    const csvData = data.map((item) => {
      const keys = Object.keys(item);

      return keys.map((k) => {
        if (titles.length < keys.length) titles.push(titlesMap[k]);

        return item[k];
      });
    });

    pre.push([titles, ...csvData]);

    return pre;
  }, [] as any);
}
