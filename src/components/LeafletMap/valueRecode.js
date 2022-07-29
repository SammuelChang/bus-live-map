export default function valueRecode(column, value) {
  switch (true) {
    case ((column === 'BusStatus') && (value === 0)): return '正常';
    case ((column === 'BusStatus') && (value === 1)): return '車禍';
    case ((column === 'BusStatus') && (value === 2)): return '故障';
    case ((column === 'BusStatus') && (value === 3)): return '塞車';
    case ((column === 'BusStatus') && (value === 4)): return '緊急求援';
    case ((column === 'BusStatus') && (value === 5)): return '加油';
    case ((column === 'BusStatus') && (value === 98)): return '偏移路線';
    case ((column === 'BusStatus') && (value === 99)): return '非營運狀態';
    case ((column === 'BusStatus') && (value === 100)): return '客滿';
    case ((column === 'BusStatus') && (value === 101)): return '包車出租';
    case ((column === 'BusStatus') && (value === 255)): return '未知';
    case ((column === 'Direction') && (value === 0)): return '去程';
    case ((column === 'Direction') && (value === 1)): return '返程';
    case ((column === 'Direction') && (value === 2)): return '迴圈';
    default: return 'error';
  }
}
