
import { Component, OnInit } from '@angular/core';
import { TenantService } from '../../services/tenant.service';
import { Organization, TenantStatus } from '../../types';
import { Loader2, ShieldAlert, Zap, LogIn, RefreshCw, SlidersHorizontal, BrainCircuit } from 'lucide-react';

@Component({
  selector: 'app-command-center',
  templateUrl: './command-center.component.html',
  styleUrls: ['./command-center.component.css']
})
export class CommandCenterComponent implements OnInit {
  organizations: Organization[] = [];
  isLoading = true;
  selectedForArbitrage: string | null = null;

  constructor(private tenantService: TenantService) {}

  ngOnInit() {
    this.tenantService.tenants$.subscribe(data => {
      this.organizations = data;
      this.isLoading = false;
    });
  }

  handleGhostLogin(tenantId: string) {
    if (confirm('تنبيه: أنت بصدد تفعيل بروتوكول Ghost Login. سيتم تسجيل كافة تحركاتك في سجل النزاهة.')) {
      this.tenantService.ghostLogin(tenantId).subscribe(res => {
        // Store shadow token and jump to tenant domain
        localStorage.setItem('yemengpt_shadow_token', res.token);
        window.open(res.redirectUrl, '_blank');
      });
    }
  }

  togglePanicMode(org: Organization) {
    const action = org.status === 'maintenance' ? 'disable' : 'enable';
    const msg = action === 'enable' 
      ? 'تحذير: سيتم تحويل واجهة المؤسسة إلى وضع التمويه (decoy) وقفل كافة العمليات. هل أنت متأكد؟'
      : 'هل تريد فك حظر العمليات وإعادة تشغيل الواجهة السيادية؟';

    if (confirm(msg)) {
      this.tenantService.triggerPanic(org.id, action).subscribe();
    }
  }

  onRebalance(fromId: string, toId: string, amount: number) {
    this.tenantService.arbitrage(fromId, toId, amount).subscribe(() => {
      console.log('Arbitrage Successful');
    });
  }

  getStatusColor(org: Organization): string {
    if (org.status === 'maintenance') return 'text-red-500 shadow-[0_0_10px_red]';
    if (org.usage?.cpu > 80) return 'text-[#e1b000] animate-pulse';
    return 'text-emerald-500';
  }
}
