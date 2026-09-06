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

/** Poster order: Americas and Oceania, then Atlantic and Mediterranean Europe, then Asia. */
export const REGIONS: Region[] = [
  usa,
  canada,
  mexico,
  argentina,
  australia,
  uk,
  portugal,
  spain,
  france,
  italy,
  germany,
  austria,
  greece,
  turkey,
  egypt,
  iraq,
  iran,
  india,
  china,
  japan,
];

export const byId = (id: string): Region | undefined =>
  REGIONS.find((r) => r.id === id);
