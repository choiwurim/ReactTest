// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

//서버 가져오기
import {server} from './mocks/server';

// 서버 시작 전 server를 listen
beforeAll(()=>server.listen());
// 테스트 중 다른 테스트에 영향을 주지 않기 위해
afterEach(()=>server.resetHandlers());
// 테스트가 끝난 후 서버를 cleanup
afterAll(()=>server.close());