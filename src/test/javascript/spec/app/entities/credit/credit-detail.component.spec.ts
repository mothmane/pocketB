/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PocketBTestModule } from '../../../test.module';
import { CreditDetailComponent } from '../../../../../../main/webapp/app/entities/credit/credit-detail.component';
import { CreditService } from '../../../../../../main/webapp/app/entities/credit/credit.service';
import { Credit } from '../../../../../../main/webapp/app/entities/credit/credit.model';

describe('Component Tests', () => {

    describe('Credit Management Detail Component', () => {
        let comp: CreditDetailComponent;
        let fixture: ComponentFixture<CreditDetailComponent>;
        let service: CreditService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PocketBTestModule],
                declarations: [CreditDetailComponent],
                providers: [
                    CreditService
                ]
            })
            .overrideTemplate(CreditDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CreditDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CreditService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Credit(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.credit).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
