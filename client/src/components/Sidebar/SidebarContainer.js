import React from 'react';
import PropTypes from 'prop-types';
import { EnsureTTI } from '@deity/falcon-front-kit';
import { CloseSidebarMutation } from './CloseSidebarMutation';
import { OpenSidebarMutation } from './OpenSidebarMutation';
import { SidebarQuery } from './SidebarQuery';

export const SidebarContainer = ({ children }) => (
  <SidebarQuery>
    {({ data: { sidebar } }) => (
      <EnsureTTI forceReady={sidebar.isOpen}>
        {({ isReady }) => {
          return (
            <OpenSidebarMutation>
              {open => (
                <CloseSidebarMutation>
                  {close => (isReady ? children({ ...sidebar, open, close }) : null)}
                </CloseSidebarMutation>
              )}
            </OpenSidebarMutation>
          );
        }}
      </EnsureTTI>
    )}
  </SidebarQuery>
);

SidebarContainer.propTypes = {
  children: PropTypes.func.isRequired
};
