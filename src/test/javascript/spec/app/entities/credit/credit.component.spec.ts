/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PocketBTestModule } from '../../../test.module';
import { CreditComponent } from '../../../../../../main/webapp/app/entities/credit/credit.component';
import { CreditService } from '../../../../../../main/webapp/app/entities/credit/credit.service';
import { Credit } from '../../../../../../main/webapp/app/entities/credit/credit.model';

describe('Component Tests', () => {

    describe('Credit Management Component', () => {
        let comp: CreditComponent;
        let fixture: ComponentFixture<CreditComponent>;
        let service: CreditService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PocketBTestModule],
                declarations: [CreditComponent],
                providers: [
                    CreditService
                ]
            })
            .overrideTemplate(CreditComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CreditComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CreditService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Credit(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.credits[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
