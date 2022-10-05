import * as util from 'util';
import { _ } from '../../../../../i18n';
import { emojify } from '../../../../../util/emoji';
import { isBranchModified } from '../../../../../util/git';
import type { BranchConfig } from '../../../../types';

export async function getControls(config: BranchConfig): Promise<string> {
  const warning = (await isBranchModified(config.branchName))
    ? emojify(' :warning: **Warning**: ' + _('custom changes will be lost.'))
    : '';
  return util.format(
    `\n\n---\n\n - [ ] <!-- rebase-check -->%s${warning}\n\n`,
    _('If you want to rebase/retry this PR, click this checkbox.')
  );
}
