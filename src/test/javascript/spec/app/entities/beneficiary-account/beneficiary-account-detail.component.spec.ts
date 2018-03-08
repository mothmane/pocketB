/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PocketBTestModule } from '../../../test.module';
import { BeneficiaryAccountDetailComponent } from '../../../../../../main/webapp/app/entities/beneficiary-account/beneficiary-account-detail.component';
import { BeneficiaryAccountService } from '../../../../../../main/webapp/app/entities/beneficiary-account/beneficiary-account.service';
import { BeneficiaryAccount } from '../../../../../../main/webapp/app/entities/beneficiary-account/beneficiary-account.model';

describe('Component Tests', () => {

    describe('BeneficiaryAccount Management Detail Component', () => {
        let comp: BeneficiaryAccountDetailComponent;
        let fixture: ComponentFixture<BeneficiaryAccountDetailComponent>;
        let service: BeneficiaryAccountService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PocketBTestModule],
                declarations: [BeneficiaryAccountDetailComponent],
                providers: [
                    BeneficiaryAccountService
                ]
            })
            .overrideTemplate(BeneficiaryAccountDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BeneficiaryAccountDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BeneficiaryAccountService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BeneficiaryAccount(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.beneficiaryAccount).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
