/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PocketBTestModule } from '../../../test.module';
import { BankReferenceComponent } from '../../../../../../main/webapp/app/entities/bank-reference/bank-reference.component';
import { BankReferenceService } from '../../../../../../main/webapp/app/entities/bank-reference/bank-reference.service';
import { BankReference } from '../../../../../../main/webapp/app/entities/bank-reference/bank-reference.model';

describe('Component Tests', () => {

    describe('BankReference Management Component', () => {
        let comp: BankReferenceComponent;
        let fixture: ComponentFixture<BankReferenceComponent>;
        let service: BankReferenceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PocketBTestModule],
                declarations: [BankReferenceComponent],
                providers: [
                    BankReferenceService
                ]
            })
            .overrideTemplate(BankReferenceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BankReferenceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankReferenceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BankReference(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bankReferences[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
