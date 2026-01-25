
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TenantService } from '../../../services/tenant.service';
import { Organization, TenantStatus } from '../../../types';
import { Subject, interval } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root-dashboard',
  templateUrl: './root-dashboard.component.html',
  styleUrls: ['./root-dashboard.component.css']
})
export class RootDashboardComponent implements OnInit, OnDestroy {
  tenants: Organization[] = [];
  globalMetrics = { cpu: 0, ram: 0, activeNodes: 0 };
  private destroy$ = new Subject<void>();

  constructor(private tenantService: TenantService) {}

  ngOnInit() {
    // Live Grid Telemetry Polling (Every 10s)
    interval(10000).pipe(
      takeUntil(this.destroy$),
      switchMap(() => this.tenantService.getGlobalHealth())
    ).subscribe(data => {
      this.tenants = data.tenants;
      this.globalMetrics = data.metrics;
    });
  }

  /**
   * بروتوكول الولوج الشبح: يسمح للمسؤول بالدخول لعقدة مؤسسة دون كلمة مرور للتحقيق أو الدعم.
   */
  activateGhostMode(tenantId: string) {
    if (confirm('تنبيه: سيتم تسجيل دخولك بهوية "شبح" لهذه العقدة. سيتم أرشفة كافة العمليات لأغراض النزاهة.')) {
      this.tenantService.requestGhostToken(tenantId).subscribe(res => {
        window.open(res.accessUrl, '_blank');
      });
    }
  }

  /**
   * زر الطوارئ العالمي: تجميد كافة العمليات في عقدة معينة فوراً.
   */
  triggerPanicMode(tenantId: string) {
    const reason = prompt('يرجى إدخال سبب تفعيل Panic Mode (سيتم عرضه كرسالة تمويه):');
    if (reason) {
      this.tenantService.lockTenant(tenantId, reason).subscribe(() => {
        alert('تم قفل العقدة وتفعيل وضع التمويه بنجاح.');
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
