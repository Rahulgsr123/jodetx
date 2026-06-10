import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ReportingTag {
  id: number;
  name: string;
  type: string;
  status: string;
}

interface EmptyStateLine {
  text: string;
}

interface EmptyStateButton {
  label: string;
  route: string;
}

interface IllustrationLine {
  width: string;
}

interface IllustrationData {
  paperLines: IllustrationLine[];
}

interface ReportingTagsPageData {
  title: string;
  emptyState: {
    illustration: IllustrationData;
    lines: EmptyStateLine[];
    button: EmptyStateButton;
  };
  tags: ReportingTag[];
}

@Component({
  selector: 'app-reporting-tags',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reporting.html',
  styleUrl: './reporting.scss',
})
export class Reporting {
  pageData: ReportingTagsPageData = {
    title: 'Reporting Tags',

    emptyState: {
      illustration: {
        paperLines: [
          {
            width: '16px',
          },
          {
            width: '31px',
          },
          {
            width: '31px',
          },
        ],
      },

      lines: [
        {
          text: 'Reporting tags are labels that can be associated with your transactions, records and reports.',
        },
        {
          text: 'You can use these tags to filter reports and gain insights into your business.',
        },
      ],

      button: {
        label: '+ New Reporting Tag',
        route: '/create-reporting',
      },
    },

    tags: [
      // Keep empty to show empty state exactly like screenshot.

      // Example JSON data:
      // {
      //   id: 1,
      //   name: 'Branch',
      //   type: 'Transaction',
      //   status: 'Active',
      // },
    ],
  };

  get hasTags(): boolean {
    return this.pageData.tags.length > 0;
  }

  trackByLine(index: number, line: EmptyStateLine): string {
    return `${line.text}-${index}`;
  }

  trackByPaperLine(index: number, line: IllustrationLine): string {
    return `${line.width}-${index}`;
  }

  trackByTag(index: number, tag: ReportingTag): number {
    return tag.id;
  }
}