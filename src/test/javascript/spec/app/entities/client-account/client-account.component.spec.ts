/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PocketBTestModule } from '../../../test.module';
import { ClientAccountComponent } from '../../../../../../main/webapp/app/entities/client-account/client-account.component';
import { ClientAccountService } from '../../../../../../main/webapp/app/entities/client-account/client-account.service';
import { ClientAccount } from '../../../../../../main/webapp/app/entities/client-account/client-account.model';

describe('Component Tests', () => {

    describe('ClientAccount Management Component', () => {
        let comp: ClientAccountComponent;
        let fixture: ComponentFixture<ClientAccountComponent>;
        let service: ClientAccountService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PocketBTestModule],
                declarations: [ClientAccountComponent],
                providers: [
                    ClientAccountService
                ]
            })
            .overrideTemplate(ClientAccountComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientAccountComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientAccountService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ClientAccount(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.clientAccounts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
