// * Generates number of random geolocation points given a center and a radius.
// ? Source Code: https://gist.github.com/mkhatib/5641004

type Point = { lat: Number; lng: Number };

interface GenerateRandomPointsParams {
  center: Point; //*? center A JS object with lat and lng attributes.
  radius: Number; //*? Radius in meters.
  count: Number; //*? number of points to generate.
}

const generateRandomPoints = ({
  center,
  radius,
  count,
}: GenerateRandomPointsParams): Point[] => {
  let points: Point[] = new Array<Point>();

  for (let i = 0; i < count; i++) {
    points.push(generateRandomPoint(center, radius));
  }

  return points;
};

const generateRandomPoint = (center: Point, radius: Number): Point => {
  const x0 = center.lng;
  const y0 = center.lat;

  // Convert Radius from meters to degrees.
  const rd: Number = <number>radius / 111300;

  const u = Math.random();
  const v = Math.random();

  const w: Number = <number>rd * Math.sqrt(u);
  const t: Number = 2 * Math.PI * v;
  const x: Number = <number>w * Math.cos(<number>t);
  const y: Number = <number>w * Math.sin(<number>t);

  const xp: number = <number>x / Math.cos(<number>y0);

  // Resulting point.
  return { lat: <number>y + <number>y0, lng: <number>xp + <number>x0 };
};

export default generateRandomPoints;
