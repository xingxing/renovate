import { regEx } from '../../../util/regex';
import { GenericVersion, GenericVersioningApi } from '../generic';
import type { VersioningApi } from '../types';

export const id = 'kubernetes-api';
export const displayName = 'kubernetes-api';
export const urls = [
  'https://kubernetes.io/docs/reference/using-api/#api-versioning',
];
export const supportsRanges = false;

const kubernetesApiRegex = regEx(
  '^(?<group>\\S+\\/)?v(?<version>\\d+)(?<prerelease>(?:alpha|beta)\\d+)?$'
);

export class KubernetesApiVersioningApi extends GenericVersioningApi {
  protected _parse(version: string): GenericVersion | null {
    if (version) {
      const matchGroups = kubernetesApiRegex.exec(version)?.groups;
      if (matchGroups) {
        const { version, prerelease } = matchGroups;
        return { release: [parseInt(version, 10)], prerelease };
      }
    }
    return null;
  }
}

export const api: VersioningApi = new KubernetesApiVersioningApi();

export default api;
