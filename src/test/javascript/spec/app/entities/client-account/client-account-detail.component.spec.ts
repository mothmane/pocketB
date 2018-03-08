/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PocketBTestModule } from '../../../test.module';
import { ClientAccountDetailComponent } from '../../../../../../main/webapp/app/entities/client-account/client-account-detail.component';
import { ClientAccountService } from '../../../../../../main/webapp/app/entities/client-account/client-account.service';
import { ClientAccount } from '../../../../../../main/webapp/app/entities/client-account/client-account.model';

describe('Component Tests', () => {

    describe('ClientAccount Management Detail Component', () => {
        let comp: ClientAccountDetailComponent;
        let fixture: ComponentFixture<ClientAccountDetailComponent>;
        let service: ClientAccountService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PocketBTestModule],
                declarations: [ClientAccountDetailComponent],
                providers: [
                    ClientAccountService
                ]
            })
            .overrideTemplate(ClientAccountDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientAccountDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientAccountService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ClientAccount(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.clientAccount).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
