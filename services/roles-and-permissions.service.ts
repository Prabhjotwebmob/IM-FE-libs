import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RolesAndPermissionsService {
    rolesAndPermissions$: Subject<any> = new Subject();
    rolesAndPermissions: any = {};

    constructor() {
        this.rolesAndPermissions$.subscribe(response => {
            this.rolesAndPermissions = response;
        });
        const roles = JSON.parse(String(sessionStorage.getItem('roles')));
        if (roles) {
            this.rolesAndPermissions$.next(roles);
        }
    }

    hasAccessControl(product: string, ...args): boolean {
        const permissions = _.get(this.rolesAndPermissions, `permissions.${product}`);
        return args?.every(permission => permissions?.includes(permission));
    }

    hasAccessToProduct(product: string): boolean {
        return _.get(this.rolesAndPermissions, `productAccess.${product}`);
    }

    getRole(product: string): string {
        return _.get(this.rolesAndPermissions, `roles.${product}`);
    }

    setRolesAndPermissions(rolesAndPermissions) {
        sessionStorage.setItem('roles', JSON.stringify(rolesAndPermissions));
        this.rolesAndPermissions$.next(rolesAndPermissions);
    }
}
