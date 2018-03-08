/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PocketBTestModule } from '../../../test.module';
import { TransfertComponent } from '../../../../../../main/webapp/app/entities/transfert/transfert.component';
import { TransfertService } from '../../../../../../main/webapp/app/entities/transfert/transfert.service';
import { Transfert } from '../../../../../../main/webapp/app/entities/transfert/transfert.model';

describe('Component Tests', () => {

    describe('Transfert Management Component', () => {
        let comp: TransfertComponent;
        let fixture: ComponentFixture<TransfertComponent>;
        let service: TransfertService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PocketBTestModule],
                declarations: [TransfertComponent],
                providers: [
                    TransfertService
                ]
            })
            .overrideTemplate(TransfertComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransfertComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransfertService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Transfert(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.transferts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
