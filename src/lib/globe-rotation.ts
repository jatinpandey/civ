export type Quaternion = [number, number, number, number];
export type Vector = [number, number, number];
const rad = Math.PI / 180;
export function quaternion([lambda, phi, gamma]: number[]): Quaternion {
  const l = (lambda ?? 0)*rad/2, p=(phi ?? 0)*rad/2, g=(gamma ?? 0)*rad/2;
  const sl=Math.sin(l),cl=Math.cos(l),sp=Math.sin(p),cp=Math.cos(p),sg=Math.sin(g),cg=Math.cos(g);
  return [cl*cp*cg+sl*sp*sg, sl*cp*cg-cl*sp*sg, cl*sp*cg+sl*cp*sg, cl*cp*sg-sl*sp*cg];
}
export function angles(q: Quaternion): Vector {
  const [a,b,c,d]=q;
  return [Math.atan2(2*(a*b+c*d),1-2*(b*b+c*c))/rad,
    Math.asin(Math.max(-1,Math.min(1,2*(a*c-d*b))))/rad,
    Math.atan2(2*(a*d+b*c),1-2*(c*c+d*d))/rad];
}
export function multiply(a: Quaternion,b: Quaternion): Quaternion {
  return [a[0]*b[0]-a[1]*b[1]-a[2]*b[2]-a[3]*b[3],
    a[0]*b[1]+a[1]*b[0]+a[2]*b[3]-a[3]*b[2],
    a[0]*b[2]-a[1]*b[3]+a[2]*b[0]+a[3]*b[1],
    a[0]*b[3]+a[1]*b[2]-a[2]*b[1]+a[3]*b[0]];
}
export function cartesian([lon,lat]: number[]): Vector {
  const l=(lon ?? 0)*rad,p=(lat ?? 0)*rad;
  return [Math.cos(p)*Math.cos(l),Math.cos(p)*Math.sin(l),Math.sin(p)];
}
export function delta(a:Vector,b:Vector):Quaternion {
  const w:Vector=[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const n=Math.hypot(...w);
  if(n<1e-10) return [1,0,0,0];
  const t=Math.acos(Math.max(-1,Math.min(1,a[0]*b[0]+a[1]*b[1]+a[2]*b[2])))/2,s=Math.sin(t)/n;
  return [Math.cos(t),w[2]*s,-w[1]*s,w[0]*s];
}
export function power(q:Quaternion,t:number):Quaternion {
  const a=Math.acos(Math.max(-1,Math.min(1,q[0]))),s=Math.sin(a);
  if(Math.abs(s)<1e-9)return [1,0,0,0];
  const f=Math.sin(a*t)/s;
  return [Math.cos(a*t),q[1]*f,q[2]*f,q[3]*f];
}
