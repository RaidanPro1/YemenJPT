
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { Organization, TenantStatus } from '../types';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private apiUrl = '/api/root';
  private tenantsSubject = new BehaviorSubject<Organization[]>([]);
  public tenants$ = this.tenantsSubject.asObservable();

  constructor(private http: HttpClient) {
    // Start grid telemetry polling (Simulating WebSocket mesh)
    this.initGridPolling();
  }

  private initGridPolling() {
    interval(5000).pipe(
      switchMap(() => this.http.get<Organization[]>(`${this.apiUrl}/tenants`)),
      tap(data => this.tenantsSubject.next(data))
    ).subscribe();
  }

  /**
   * Ghost Login: Request a shadow session for a specific tenant node.
   */
  ghostLogin(tenantId: string): Observable<{token: string, redirectUrl: string}> {
    return this.http.post<{token: string, redirectUrl: string}>(`${this.apiUrl}/impersonate`, { tenantId });
  }

  // Fix: Added requestGhostToken method for the root dashboard ghost mode protocol
  /**
   * Alias for ghostLogin used in root-dashboard component.
   * scheduling and providing accessUrl as expected by the component.
   */
  requestGhostToken(tenantId: string): Observable<{token: string, redirectUrl: string, accessUrl: string}> {
    return this.ghostLogin(tenantId).pipe(
      map(res => ({ ...res, accessUrl: res.redirectUrl }))
    );
  }

  /**
   * Panic Mode: Toggle camouflage and lock status.
   */
  triggerPanic(tenantId: string, action: 'enable' | 'disable'): Observable<any> {
    return this.http.post(`${this.apiUrl}/panic-mode`, { tenantId, action });
  }

  // Fix: Added lockTenant method to handle emergency freezing of tenant nodes
  /**
   * Lock Tenant (Panic Mode alias) used in root-dashboard component.
   * fixing the missing property error by providing the implementation.
   */
  lockTenant(tenantId: string, reason: string): Observable<any> {
    // In a real implementation, 'reason' would be sent to the backend to customize the decoy message.
    return this.triggerPanic(tenantId, 'enable');
  }

  // Fix: Added getGlobalHealth method to calculate system-wide telemetry data
  /**
   * Get Global Health metrics and tenants list.
   * calculates aggregated metrics for the root dashboard.
   */
  getGlobalHealth(): Observable<{tenants: Organization[], metrics: {cpu: number, ram: number, activeNodes: number}}> {
    return this.http.get<Organization[]>(`${this.apiUrl}/tenants`).pipe(
      map(tenants => {
        const metrics = {
          cpu: tenants.length > 0 ? Math.round(tenants.reduce((acc, t) => acc + (t.usage?.cpu || 0), 0) / tenants.length) : 0,
          ram: tenants.reduce((acc, t) => acc + (t.usage?.ram || 0), 0),
          activeNodes: tenants.filter(t => t.status === TenantStatus.ACTIVE).length
        };
        return { tenants, metrics };
      })
    );
  }

  /**
   * Resource Arbitrage: Rebalance CPU/RAM quotas between Org A and Org B.
   */
  arbitrage(fromId: string, toId: string, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/resource-arbitrage`, { fromId, toId, credits: amount });
  }

  /**
   * Node Provisioning: Automate DB Schema and DNS Routing for a new entity.
   */
  provisionNewNode(payload: any): Observable<Organization> {
    return this.http.post<Organization>(`${this.apiUrl}/provision`, payload);
  }
}
