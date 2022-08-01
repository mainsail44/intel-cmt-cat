/*BSD LICENSE

Copyright(c) 2022 Intel Corporation. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:
  * Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in
    the documentation and/or other materials provided with the
    distribution.
  * Neither the name of Intel Corporation nor the names of its
    contributors may be used to endorse or promote products derived
    from this software without specific prior written permission.
    
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/

import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { combineLatest, map, Observable, Subscription, tap } from 'rxjs';

import { AppqosService } from 'src/app/services/appqos.service';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { L3catComponent } from './l3cat/l3cat.component';

import {
  CacheAllocation,
  Caps,
  MBACTRL,
  RDTIface,
  SSTBF,
} from './system-caps.model';

@Component({
  selector: 'app-system-caps',
  templateUrl: './system-caps.component.html',
  styleUrls: ['./system-caps.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

/* Component used to show System Capabilities and capability details*/
export class SystemCapsComponent implements OnInit {
  caps!: string[];
  loading: boolean = false;

  constructor(
    private service: AppqosService,
    private snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.service.getCaps().subscribe({
      next: (caps: Caps) => {
        this.caps = caps.capabilities;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.handleError(error.message);
      },
    });
  }
}
