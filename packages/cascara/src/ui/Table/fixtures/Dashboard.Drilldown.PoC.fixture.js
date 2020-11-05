/** eslint-disable no-console */
import React from 'react';
import JsonPlaceholder from '../../../placeholders/JsonPlaceholder';
import { generateFakeReport9 } from '../../../lib/mock/generateFakeReport9';
import Table from '..';

const todaysDate = new Date();
const currentMonth = todaysDate.getMonth();
const currentYear = todaysDate.getFullYear();
const from_date = new Date(currentYear, currentMonth - 1, 1);
const to_date = new Date(currentYear, currentMonth, 0);

const data = generateFakeReport9(200, from_date, to_date).map(
  (reportEntry) => ({
    ...reportEntry,
  })
);

const dataConfig = {
  actions: [
    {
      content: 'View',
      module: 'button',
    },
    {
      content: 'Edit',
      module: 'edit',
    },
  ],
  display: [
    {
      attribute: 'date',
      isEditable: false,
      label: 'Date',
      module: 'text',
    },
    {
      attribute: 'interactionText',
      isEditable: false,
      label: 'Interaction Text',
      module: 'textarea',
    },
    {
      attribute: 'interactionEid',
      isEditable: false,
      label: 'Interaction eid',
      module: 'text',
    },
    {
      attribute: 'noResponse',
      isEditable: false,
      label: 'No response',
      module: 'text',
    },
    {
      attribute: 'userName',
      isEditable: false,
      label: 'User Name',
      module: 'text',
    },
    {
      attribute: 'userJobRole',
      isEditable: false,
      label: 'User Job Role',
      module: 'text',
    },
    {
      attribute: 'userDepartment',
      isEditable: false,
      label: 'User Department',
      module: 'text',
    },
    {
      attribute: 'userLocation',
      isEditable: false,
      label: 'User Location',
      module: 'text',
    },
    {
      attribute: 'zone',
      isEditable: false,
      label: 'zone',
      module: 'text',
    },
    {
      attribute: 'country',
      isEditable: false,
      label: 'country',
      module: 'text',
    },
    {
      attribute: 'state',
      isEditable: false,
      label: 'state',
      module: 'text',
    },
    {
      attribute: 'city',
      isEditable: false,
      label: 'city',
      module: 'text',
    },
    {
      attribute: 'address',
      isEditable: false,
      label: 'address',
      module: 'text',
    },
    {
      attribute: 'postalCode',
      isEditable: false,
      label: 'postal_code',
      module: 'text',
    },
    {
      attribute: 'building',
      isEditable: false,
      label: 'building',
      module: 'text',
    },
    {
      attribute: 'floor',
      isEditable: false,
      label: 'floor',
      module: 'text',
    },
    {
      attribute: 'matchedIntent',
      isEditable: false,
      label: 'Matched (Archetype) Intent',
      module: 'text',
    },
    {
      attribute: 'intentReviewed',
      isEditable: false,
      label: 'Intent Reviewed',
      module: 'text',
    },
    {
      attribute: 'source',
      isEditable: false,
      label: 'Source',
      module: 'text',
    },
    {
      attribute: 'actualMatchedIntent',
      isEditable: false,
      label: 'Actual Matched Intent',
      module: 'text',
    },
    {
      attribute: 'actualMatchedApplication',
      isEditable: false,
      label: 'Actual Matched Application',
      module: 'text',
    },
    {
      attribute: 'caseReference',
      isEditable: false,
      label: 'Case Reference',
      module: 'text',
    },
    {
      attribute: 'espServiceDepartment',
      isEditable: false,
      label: 'Esp Service Department',
      module: 'text',
    },
    {
      attribute: 'espCategory',
      isEditable: false,
      label: 'Esp Category',
      module: 'text',
    },
    {
      attribute: 'espServiceTeam',
      isEditable: false,
      label: 'Esp Service Team',
      module: 'text',
    },
    {
      attribute: 'serviceDepartment',
      isEditable: false,
      label: 'Service Department',
      module: 'text',
    },
    {
      attribute: 'helpfulFeedback',
      isEditable: false,
      label: 'Helpful Feedback',
      module: 'textarea',
    },
    {
      attribute: 'taskFeedback',
      isEditable: false,
      label: 'Task Feedback',
      module: 'textarea',
    },
    {
      attribute: 'supportFeedback',
      isEditable: false,
      label: 'Support Feedback',
      module: 'textarea',
    },
    {
      attribute: 'deflected',
      isEditable: false,
      isLabeled: false,
      label: 'Deflected',
      module: 'text',
    },
    {
      attribute: 'channel',
      isEditable: false,
      label: 'Channel',
      module: 'text',
    },
    {
      attribute: 'conversation',
      isEditable: false,
      label: 'Conversation',
      module: 'text',
    },
  ],
};

const Fixture = () => {
  return (
    <>
      <JsonPlaceholder data={dataConfig} title='dataConfig' />
      <Table
        data={data}
        dataConfig={dataConfig}
        onAction={console.log}
        uniqueIdAttribute={'eid'}
      />
    </>
  );
};

export default Fixture;
