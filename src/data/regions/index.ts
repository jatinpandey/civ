import type { Region } from "../types";
import { usa } from "./usa";
import { canada } from "./canada";
import { mexico } from "./mexico";
import { argentina } from "./argentina";
import { australia } from "./australia";
import { uk } from "./uk";
import { portugal } from "./portugal";
import { spain } from "./spain";
import { france } from "./france";
import { italy } from "./italy";
import { germany } from "./germany";
import { austria } from "./austria";
import { greece } from "./greece";
import { turkey } from "./turkey";
import { egypt } from "./egypt";
import { iraq } from "./iraq";
import { iran } from "./iran";
import { india } from "./india";
import { china } from "./china";
import { japan } from "./japan";

export const REGIONS: Region[] = [
  india,
  china,
  japan,
  egypt,
  turkey,
  iraq,
  iran,
  italy,
  greece,
  uk,
  usa,
  argentina,
  spain,
  france,
  portugal,
  germany,
  austria,
  australia,
  canada,
  mexico,
];

export const byId = (id: string): Region | undefined =>
  REGIONS.find((r) => r.id === id);
