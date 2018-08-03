/*
 * SonarQube
 * Copyright (C) 2009-2018 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import { getJSON, postJSON } from '../helpers/request';
import { AlmRepository } from '../app/types';
import throwGlobalError from '../app/utils/throwGlobalError';

export function getRepositories(): Promise<{
  almIntegration: {
    installed: boolean;
    installationUrl: string;
  };
  repositories: AlmRepository[];
}> {
  return getJSON('/api/alm_integration/list_repositories').catch(throwGlobalError);
}

export function provisionProject(data: {
  installationKeys: string[];
}): Promise<{ projects: Array<{ projectKey: string }> }> {
  return postJSON('/api/alm_integration/provision_projects', {
    ...data,
    installationKeys: data.installationKeys.join(',')
  }).catch(throwGlobalError);
}
