import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FilterOption } from 'src/app/components/filter-dropdown/filter-dropdown.component';
import { ORDER_BY_DIRECTION } from 'src/app/gql';
import {
  ISSUE_ORDER_FIELD,
  Label,
  Milestone,
  OPEN_CLOSED_STATE,
  SortOption,
} from 'src/app/gql/models/repo-issues';

const sortOptions: FilterOption[] = [
  {
    label: 'Newest',
    value: `${ISSUE_ORDER_FIELD.CREATED_AT}^${ORDER_BY_DIRECTION.DESC}`,
  },
  {
    label: 'Oldest',
    value: `${ISSUE_ORDER_FIELD.CREATED_AT}^${ORDER_BY_DIRECTION.ASC}`,
  },
  {
    label: 'Most commented',
    value: `${ISSUE_ORDER_FIELD.COMMENTS}^${ORDER_BY_DIRECTION.DESC}`,
  },
  {
    label: 'Least commented',
    value: `${ISSUE_ORDER_FIELD.COMMENTS}^${ORDER_BY_DIRECTION.ASC}`,
  },
  {
    label: 'Recently updated',
    value: `${ISSUE_ORDER_FIELD.UPDATED_AT}^${ORDER_BY_DIRECTION.DESC}`,
  },
  {
    label: 'Least recently updated',
    value: `${ISSUE_ORDER_FIELD.UPDATED_AT}^${ORDER_BY_DIRECTION.ASC}`,
  },
];

@Component({
  selector: 'app-issues-filters',
  templateUrl: './issues-filters.component.html',
  styleUrls: ['./issues-filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssuesFiltersComponent {
  @Input() openCount: number | null | undefined = 0;
  @Input() closedCount: number | null | undefined = 0;
  @Input() currentMilestone: string | null = null;
  @Input() set milestones(val: Milestone[] | null | undefined) {
    const a = val as Milestone[];
    const b = [{ title: 'Issue with no milestone', id: '' }, ...a];
    this.milestoneOptions = b.map((milestone) => ({
      label: milestone.title,
      value: milestone.id,
    }));
  }
  @Input() currentLabel: string | null = '';
  @Input() set labels(val: Label[] | null) {
    const a = val as Label[];
    this.labelOptions = a.map((label) => ({
      label: label.name,
      value: label.name,
    }));
  }
  @Input() sort: SortOption | null = null;
  @Input() issueState: OPEN_CLOSED_STATE | null = OPEN_CLOSED_STATE.OPEN;

  @Output() openIssue = new EventEmitter<void>();
  @Output() closeIssue = new EventEmitter<void>();
  @Output() setLabel = new EventEmitter<string>();
  @Output() setMilestone = new EventEmitter<string>();
  @Output() setSort = new EventEmitter<string>();

  labelOptions: FilterOption[] = [];
  milestoneOptions: FilterOption[] = [];
  sortOptions = sortOptions;

  getOpenStyle() {
    return this.issueState === OPEN_CLOSED_STATE.OPEN
      ? 'font-semibold text-gray-900'
      : 'text-gray-600';
  }

  getClosedStyle() {
    return this.issueState === OPEN_CLOSED_STATE.CLOSED
      ? 'font-semibold text-gray-900'
      : 'text-gray-600';
  }

  handleOpenIssueClick() {
    this.openIssue.emit();
  }

  handleCloseIssueClick() {
    this.closeIssue.emit();
  }

  handleLabelClick(label: string) {
    this.setLabel.emit(label);
  }

  handleMilestoneClick(milestone: string) {
    this.setMilestone.emit(milestone);
  }

  handleSortClick(sort: string) {
    this.setSort.emit(sort);
  }
}