/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PocketBTestModule } from '../../../test.module';
import { TransfertDetailComponent } from '../../../../../../main/webapp/app/entities/transfert/transfert-detail.component';
import { TransfertService } from '../../../../../../main/webapp/app/entities/transfert/transfert.service';
import { Transfert } from '../../../../../../main/webapp/app/entities/transfert/transfert.model';

describe('Component Tests', () => {

    describe('Transfert Management Detail Component', () => {
        let comp: TransfertDetailComponent;
        let fixture: ComponentFixture<TransfertDetailComponent>;
        let service: TransfertService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PocketBTestModule],
                declarations: [TransfertDetailComponent],
                providers: [
                    TransfertService
                ]
            })
            .overrideTemplate(TransfertDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransfertDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransfertService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Transfert(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.transfert).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
