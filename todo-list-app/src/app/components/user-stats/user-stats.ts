import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { TranslocoModule } from '@jsverse/transloco';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { TodosStore } from '../../store/todos-store';
import { AuthStore } from '../../store/auth-store';

@Component({
  selector: 'app-user-stats',
  imports: [CommonModule, TranslocoModule, MatCardModule, MatTableModule, BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './user-stats.html',
  styleUrl: './user-stats.scss',
})
export class UserStats {
  protected readonly authStore = inject(AuthStore);
  protected readonly todosStore = inject(TodosStore);
  displayedColumns: string[] = ['name', 'total', 'completedCount', 'time'];

  topSprints = computed(() => {
    const stats = this.todosStore.userStats().sprintStats;

    return stats
      .map((sprint) => {
        const pct = sprint.total > 0 ? Math.round((sprint.completedCount / sprint.total) * 100) : 0;

        const chartData: ChartConfiguration<'doughnut'>['data'] = {
          datasets: [
            {
              data: [sprint.completedCount, sprint.total - sprint.completedCount],
              backgroundColor: ['#ba005c', '#ffdad4'],
              borderWidth: 0,
              circumference: 360,
              rotation: 0,
            },
          ],
        };

        return {
          ...sprint,
          name: `${sprint.name !== 'No Sprint' ? 'Sprint ' : ''}${sprint.name}`,
          percentage: pct,
          chartData,
        };
      })
      .filter((sprint) => sprint.percentage > 0)
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3);
  });

  readonly chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '90%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };
}
