/** eslint-disable no-console */
import React, { PureComponent } from 'react';
import { Dropdown, Header } from 'semantic-ui-react';

import JsonPlaceholder from '../../../placeholders/JsonPlaceholder';

import './TableStyleTest.module.scss';
import { generateFakeReport9 } from '../../../lib/mock/generateFakeReport9';
import Table from '..';

const report9Columns = [
  {
    attribute: 'date',
    isEditable: false,
    isLabeled: false,
    label: 'Date',
    module: 'text',
  },
  {
    attribute: 'interactionText',
    isEditable: false,
    isLabeled: false,
    label: 'Interaction Text',
    module: 'text',
  },
  {
    attribute: 'interactionEid',
    isEditable: false,
    isLabeled: false,
    label: 'Interaction eid',
    module: 'text',
  },
  {
    attribute: 'noResponse',
    isEditable: false,
    isLabeled: false,
    label: 'No response',
    module: 'text',
  },
  {
    attribute: 'userName',
    isEditable: false,
    isLabeled: false,
    label: 'User Name',
    module: 'text',
  },
  {
    attribute: 'userJobRole',
    isEditable: false,
    isLabeled: false,
    label: 'User Job Role',
    module: 'text',
  },
  {
    attribute: 'userDepartment',
    isEditable: false,
    isLabeled: false,
    label: 'User Department',
    module: 'text',
  },
  {
    attribute: 'userLocation',
    isEditable: false,
    isLabeled: false,
    label: 'User Location',
    module: 'text',
  },
  {
    attribute: 'zone',
    isEditable: false,
    isLabeled: false,
    label: 'zone',
    module: 'text',
  },
  {
    attribute: 'country',
    isEditable: false,
    isLabeled: false,
    label: 'country',
    module: 'text',
  },
  {
    attribute: 'state',
    isEditable: false,
    isLabeled: false,
    label: 'state',
    module: 'text',
  },
  {
    attribute: 'city',
    isEditable: false,
    isLabeled: false,
    label: 'city',
    module: 'text',
  },
  {
    attribute: 'address',
    isEditable: false,
    isLabeled: false,
    label: 'address',
    module: 'text',
  },
  {
    attribute: 'postalCode',
    isEditable: false,
    isLabeled: false,
    label: 'postal_code',
    module: 'text',
  },
  {
    attribute: 'building',
    isEditable: false,
    isLabeled: false,
    label: 'building',
    module: 'text',
  },
  {
    attribute: 'floor',
    isEditable: false,
    isLabeled: false,
    label: 'floor',
    module: 'text',
  },
  {
    attribute: 'matchedIntent',
    isEditable: false,
    isLabeled: false,
    label: 'Matched (Archetype) Intent',
    module: 'text',
  },
  {
    attribute: 'intentReviewed',
    isEditable: false,
    isLabeled: false,
    label: 'Intent Reviewed',
    module: 'text',
  },
  {
    attribute: 'source',
    isEditable: false,
    isLabeled: false,
    label: 'Source',
    module: 'text',
  },
  {
    attribute: 'actualMatchedIntent',
    isEditable: false,
    isLabeled: false,
    label: 'Actual Matched Intent',
    module: 'text',
  },
  {
    attribute: 'actualMatchedApplication',
    isEditable: false,
    isLabeled: false,
    label: 'Actual Matched Application',
    module: 'text',
  },
  {
    attribute: 'caseReference',
    isEditable: false,
    isLabeled: false,
    label: 'Case Reference',
    module: 'text',
  },
  {
    attribute: 'espServiceDepartment',
    isEditable: false,
    isLabeled: false,
    label: 'Esp Service Department',
    module: 'text',
  },
  {
    attribute: 'espCategory',
    isEditable: false,
    isLabeled: false,
    label: 'Esp Category',
    module: 'text',
  },
  {
    attribute: 'espServiceTeam',
    isEditable: false,
    isLabeled: false,
    label: 'Esp Service Team',
    module: 'text',
  },
  {
    attribute: 'serviceDepartment',
    isEditable: false,
    isLabeled: false,
    label: 'Service Department',
    module: 'text',
  },
  {
    attribute: 'helpfulFeedback',
    isEditable: false,
    isLabeled: false,
    label: 'Helpful Feedback',
    module: 'text',
  },
  {
    attribute: 'taskFeedback',
    isEditable: false,
    isLabeled: false,
    label: 'Task Feedback',
    module: 'text',
  },
  {
    attribute: 'supportFeedback',
    isEditable: false,
    isLabeled: false,
    label: 'Support Feedback',
    module: 'text',
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
    isLabeled: false,
    label: 'Channel',
    module: 'text',
  },
  {
    attribute: 'conversation',
    isEditable: false,
    isLabeled: false,
    label: 'Conversation',
    module: 'text',
  },
];

const todaysDate = new Date();
const currentMonth = todaysDate.getMonth();
const currentYear = todaysDate.getFullYear();
const from_date = new Date(currentYear, currentMonth - 1, 1);
const to_date = new Date(currentYear, currentMonth, 0);

class Fixture extends PureComponent {
  state = {
    allColumns: report9Columns,
    data: generateFakeReport9(200, from_date, to_date).map((reportEntry) => ({
      ...reportEntry,
    })),
    dataConfig: {
      actions: [],
      display: [],
    },
  };

  handleColumnSelection = (_, { value: selectedColumns }) => {
    const { allColumns, dataConfig } = this.state;
    const newDisplay = allColumns
      .filter((column) => selectedColumns.includes(column.attribute))
      .reverse();

    this.setState({ dataConfig: { ...dataConfig, display: newDisplay } });
  };

  render() {
    const { data, dataConfig, allColumns } = this.state;

    const availableColumns = allColumns.map((columnDef) => ({
      key: columnDef.attribute,
      text: columnDef.label,
      value: columnDef.attribute,
    }));

    const selectedColumns = dataConfig.display.map(
      (columnDef) => columnDef.attribute
    );

    return (
      <>
        <Header as='h4'>
          <Header.Content>
            Displaying columns: <br />
            <Dropdown
              header='Select columns...'
              key={'select'}
              labeled
              multiple
              onChange={this.handleColumnSelection}
              options={availableColumns}
              placeholder='select columns...'
              selectedLabel={'Display columns'}
              selection
              value={selectedColumns}
            />
          </Header.Content>
        </Header>
        <JsonPlaceholder data={dataConfig} title='dataConfig' />
        <Table
          data={data}
          dataConfig={dataConfig}
          onAction={console.log}
          uniqueIdAttribute={'eid'}
        />
      </>
    );
  }
}

export default Fixture;
