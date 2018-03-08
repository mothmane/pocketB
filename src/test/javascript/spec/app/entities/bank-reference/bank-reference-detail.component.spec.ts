/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PocketBTestModule } from '../../../test.module';
import { BankReferenceDetailComponent } from '../../../../../../main/webapp/app/entities/bank-reference/bank-reference-detail.component';
import { BankReferenceService } from '../../../../../../main/webapp/app/entities/bank-reference/bank-reference.service';
import { BankReference } from '../../../../../../main/webapp/app/entities/bank-reference/bank-reference.model';

describe('Component Tests', () => {

    describe('BankReference Management Detail Component', () => {
        let comp: BankReferenceDetailComponent;
        let fixture: ComponentFixture<BankReferenceDetailComponent>;
        let service: BankReferenceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PocketBTestModule],
                declarations: [BankReferenceDetailComponent],
                providers: [
                    BankReferenceService
                ]
            })
            .overrideTemplate(BankReferenceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BankReferenceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankReferenceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BankReference(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bankReference).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
