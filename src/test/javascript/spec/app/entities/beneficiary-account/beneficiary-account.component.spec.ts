/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PocketBTestModule } from '../../../test.module';
import { BeneficiaryAccountComponent } from '../../../../../../main/webapp/app/entities/beneficiary-account/beneficiary-account.component';
import { BeneficiaryAccountService } from '../../../../../../main/webapp/app/entities/beneficiary-account/beneficiary-account.service';
import { BeneficiaryAccount } from '../../../../../../main/webapp/app/entities/beneficiary-account/beneficiary-account.model';

describe('Component Tests', () => {

    describe('BeneficiaryAccount Management Component', () => {
        let comp: BeneficiaryAccountComponent;
        let fixture: ComponentFixture<BeneficiaryAccountComponent>;
        let service: BeneficiaryAccountService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PocketBTestModule],
                declarations: [BeneficiaryAccountComponent],
                providers: [
                    BeneficiaryAccountService
                ]
            })
            .overrideTemplate(BeneficiaryAccountComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BeneficiaryAccountComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BeneficiaryAccountService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BeneficiaryAccount(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.beneficiaryAccounts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
